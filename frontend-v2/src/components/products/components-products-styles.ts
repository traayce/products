import { createStyles, Theme } from "@material-ui/core/styles";

export const ProductsContainerStyles = (theme: Theme) => createStyles({
    Container: {
        maxWidth: "1000px",
        margin: "1em auto 0",
        padding: "1em",
        flexGgrow: 1,
        minHeight: "400px",
        paddingBottom: "2em",
    },
});