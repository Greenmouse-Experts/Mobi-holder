import { BeatLoader } from "react-spinners";

export default function Loader({size=30}) {
    return (
        <div className="flex w-full justify-center">
            <BeatLoader
                color={'rgba(163, 36, 242, 1)'}
                loading={true}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}