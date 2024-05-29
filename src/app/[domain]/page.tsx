// pages/[domain].tsx

export async function getStaticPaths() {
	const allUsers = [{ domains: ["demo", "weird"] }];
	const allPaths = allUsers.flatMap((user) =>
		user.domains.map((subdomain) => ({
			params: {
				domain: subdomain,
			},
		}))
	);

	return { paths: allPaths, fallback: false };
}

export default function DomainPage({ params }: { params: { domain: string } }) {
	console.log({ params });
	return <div>You are at domain:{params?.domain} </div>;
}
