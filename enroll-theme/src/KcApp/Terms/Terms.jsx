import {useEffect} from "react";
import {getCurrentKcLanguageTag, kcMessages} from "keycloakify/lib/i18n";
import {Terms as TermsBase} from "keycloakify/lib/components/Terms";
import axios from "axios";
import tosEn from "./TosEn.md"
import tosDe from "./TosDe.md"
import kcContext from "../kcContext";


function Terms(props) {

    const currentKcLanguageTag = getCurrentKcLanguageTag(kcContext.kcContext);

    useEffect(() => {
        if (kcContext?.kcContext?.pageId !== "terms.ftl") {
            return;
        }

        kcMessages[currentKcLanguageTag].termsTitle = "";

        let language;
        switch (currentKcLanguageTag) {
            case "de":
                language = tosDe;
                break;
            default:
                language = tosEn;

        }

        axios.get(language)
            .then(response => response.text)
            .then(markdown => kcMessages[currentKcLanguageTag].termsText = markdown);
    }, [currentKcLanguageTag])

    return <TermsBase {...{kcContext: kcContext.kcContext, ...props}}/>;

}

export default Terms;
