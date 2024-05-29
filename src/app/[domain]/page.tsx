// pages/[domain].tsx



export default function DomainPage({ params }: { params: { domain: string } }) {
	console.log({ params });
	return <div>You are at domain:{params?.domain} </div>;
}
