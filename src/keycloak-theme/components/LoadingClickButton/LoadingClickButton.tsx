import {LoadingButton} from "@mui/lab";
import {useState} from "react";

function LoadingClickButton(props: any) {

    const [isLoading, setIsLoading] = useState(false);

    return(
        <LoadingButton {...props} loading={(props.loading || isLoading)} onClick={() => {
            setIsLoading(true);
            props.onClick();
        }}>

        </LoadingButton>
    )

}

LoadingClickButton.defaultProps= {
    onClick: () => {}
}
export default LoadingClickButton;
