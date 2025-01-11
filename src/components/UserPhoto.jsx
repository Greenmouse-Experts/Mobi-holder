import AvatarInitials from "./AvatarInitials";

export default function UserPhoto({ data, organisation, size="34px", avatarSize }) {
    return (
        <>
        {data.photo ?
            <div className={`flex w-[${size}] h-[${size}]`} style={{width : size, height: size}}>
                <img src={`${data.photo}`} className="w-full h-full rounded-full object-cover" />
            </div>
            :
            <AvatarInitials name={!organisation ? `${data.firstName}${data.lastName}` : `${data.companyName}`} size={avatarSize || 8} />
        }
        </>
    )
}
