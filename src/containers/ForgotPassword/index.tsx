import Image from "next/image";
import ForgotPasswordForm from "./Form";

export default function ForgotPassword() {
  return (
		<section className="bg-[#F2F5F6]">
		<div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-7.5rem)] min-h-[600px]">
			<div className="mx-auto grid h-full max-w-full grid-cols-1 lg:grid-cols-2">
				<div className="flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20">
					<div className="w-full max-w-md lg:max-w-[445px]">
						{/* <h1 className="mb-6 font-semibold leading-snug tracking-tight
													 text-center lg:text-left text-[clamp(23px,2.6vw,30px)]">
							Forgot <span className="bg-gradient-to-r from-[#01F4C8] to-[#00A8FF] bg-clip-text text-transparent">Password</span>
						</h1> */}

						<div className="rounded-xl border border-[#E9EDEE] bg-white p-6 sm:p-7 md:p-8 shadow-xs">
							<h2 className="mb-6 font-semibold text-[clamp(20px,2.2vw,30px)]">Forgot <span className="bg-gradient-to-r from-[#01F4C8] to-[#00A8FF] bg-clip-text text-transparent">Password</span></h2>
							<ForgotPasswordForm />
						</div>
					</div>
				</div>

				<div className="relative hidden lg:block">
					<Image
						src="/images/adminLogin.png"
						alt="Admin Dashboard Preview"
						fill
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="object-cover"
						priority
					/>
				</div>
			</div>
		</div>
	</section>
  );
}
