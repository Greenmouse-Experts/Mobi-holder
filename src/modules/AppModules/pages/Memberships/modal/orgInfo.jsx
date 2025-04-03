import UserPhoto from "../../../../../components/UserPhoto";

const OrganisationInfo = ({ closeModal, orgInfo }) => {

    const formattedAddress = JSON.parse(orgInfo.companyAddress);

    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <UserPhoto data={orgInfo} size="110px" avatarSize={20} />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <p className="font-semibold text-lg">{orgInfo.companyName}</p>
                        <p>{orgInfo.companyEmail}</p>
                        <p>MobiHolder Id: {orgInfo.mobiHolderId}</p>
                    </div>
                </div>
                    <div className="flex flex-col gap-4 mt-7">

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                About Organisation
                            </p>
                            <span className="text-base">
                                {orgInfo.aboutCompany}
                            </span>
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Address
                            </p>
                            <span className="text-base">
                                {formattedAddress.street}, {formattedAddress.state}, {formattedAddress.country}
                            </span>
                        </div>

                    </div>
            </div>
        </>
    )
};

export default OrganisationInfo;
