import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

export function UserListing({ role, userList }) {
	const router = useRouter()

	return (
		<>
			<div
				className="text-2xl font-bold text-center"
				style={{ textTransform: "capitalize" }}
			>
				{role} List
			</div>

			<div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
				{userList.map((data, index) => {
					return (
						<div
							key={index}
							className="max-w-sm mx-auto bg-slate-50 rounded overflow-hidden text-gray-900 border border-gray-700 dark:bg-gray-800 dark:border-slate-700 dark:text-gray-100 w-full"
						>
							<Card className="border-0">
								<CardHeader className="flex items-center gap-3">
									<Avatar className="h-16 w-16">
										<AvatarImage
											alt="User Profile Picture"
											src={
												data.userAvatar == null
													? "/user-place-holder-image.jpg"
													: data.userAvatar
											}
										/>
										<AvatarFallback>JP</AvatarFallback>
									</Avatar>
									<div className="grid gap-1 text-sm">
										<div className="font-medium text-lg">{data.userName}</div>
										<a className="text-blue-500 hover:underline" href="#">
											{data.email}
										</a>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid gap-1 text-sm">
										<div>
											<strong>Address:</strong> {data.userAddress}
										</div>
										<div>
											<strong>Phone:</strong> {data.userPhone}
										</div>
										<div>
											<strong>Department:</strong> {data.departmentName}
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button
										size="sm"
										className="text-white bg-blue-500 hover:bg-blue-700 w-full !rounded"
										onClick={() => {
											router.push(
												`/manager/${
													role == "doctor"
														? "doctor-management"
														: role == "nurse"
														? "nurse-management"
														: role == "patient"
														? "patient-management"
														: "doctor-management"
												}/update/${data.userId}`
											)
										}}
									>
										Edit Profile
									</Button>
								</CardFooter>
							</Card>
						</div>
					)
				})}
			</div>
		</>
	)
}

function UserIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	)
}
