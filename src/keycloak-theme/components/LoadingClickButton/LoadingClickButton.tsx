import {LoadingButton} from "@mui/lab";
import {useState} from "react";

function LoadingClickButton(props: any) {

    const [isLoading, setIsLoading] = useState(false);

    console.log({...{
            ...props,
            loading: (props.loading || isLoading),
            onClick: () => {
                setIsLoading(true);
                props.onClick();
            }
        }})

    return (
        <LoadingButton {...{
            loading: (props.loading || isLoading),
            onClick: () => {
                setIsLoading(true);
                props.onClick();
            },
            ...props,
        }}>

        </LoadingButton>
    )

}

LoadingClickButton.defaultProps = {
    onClick: () => {
    }
}
export default LoadingClickButton;
