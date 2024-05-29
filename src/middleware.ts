import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
	const url = req.nextUrl;
	let hostname = req.headers
		.get("host")!
		.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

	if (
		hostname.includes("---") &&
		hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
	) {
		hostname = `${hostname.split("---")[0]}.${
			process.env.NEXT_PUBLIC_ROOT_DOMAIN
		}`;
	}

	const searchParams = req.nextUrl.searchParams.toString();
	const path = `${url.pathname}${
		searchParams.length > 0 ? `?${searchParams}` : ""
	}`;

	// Construct the complete URL including the protocol and full hostname
	const protocol = req.headers.get("x-forwarded-proto") || "http"; // Assuming http for simplicity
	const rewrittenUrl = new URL(`${protocol}://${hostname}${path}`);
	console.log(`Rewriting to: ${rewrittenUrl.href}`);

	return NextResponse.rewrite(rewrittenUrl);
}
