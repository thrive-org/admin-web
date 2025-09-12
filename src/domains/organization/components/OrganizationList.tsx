import getOrganizations from "../server/handlers/getOrganizations";
import { OrganizationRow } from "./OrganizationListTable";
import OrganizationTableClient from "./OrganizationTableClient";

const OrganizationList = async () => {
	// Fetch organizations from the server
	const orgs = await getOrganizations();

	console.log("Raw organization query result:", orgs);
	// Map to table row shape
	const data: OrganizationRow[] = orgs.map((org: any) => ({
		id: org.id,
		name: org.name,
		website: org.website,
		status: org.status,
		typeName: org.type?.name ?? "",
		address: org.address ? `${org.address.street}, ${org.address.city}` : "",
		managerName: org.manager?.[0]?.account?.user?.firstName
			? `${org.manager[0].account.user.firstName} ${org.manager[0].account.user.lastName}`
			: "",
	}));

	console.log("Organization data:", data);

	return (
		<div>
			<h1
				className="my-5 font-[600] tracking-[-0.03em] text-[40px] leading-[1] text-black px-6 py-2 rounded-xl"
				style={{ fontFamily: 'Degular, Poppins, system-ui', borderRadius: '16px' }}
			>
				New {' '}
				<span
					className="bg-[linear-gradient(270deg,#01F4C8_50%,#00A8FF_65.19%)] bg-clip-text text-transparent"
					style={{ fontFamily: 'Degular, Poppins, system-ui' }}
				>
					Organizations
				</span>
			</h1>
			<OrganizationTableClient data={data} />
		</div>
	);
}

export default OrganizationList;