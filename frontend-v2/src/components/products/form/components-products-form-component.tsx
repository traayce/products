import * as React from "react";
import { Paper, WithStyles, withStyles, Button, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { ProductsContainerStyles } from "../components-products-styles";
import { ProductFormModalComponent } from "./components-products-form-modal-component";
import axios from "axios";

type Props = WithStyles<typeof ProductsContainerStyles>;

interface State {
    name: string;
    nameError: string;
    code: string;
    codeError: string;
    price: number;
    priceError: string;
    photo: File | null;
    isSubmiting: boolean;
    isConfirmationOpen: boolean;
    error: string;
}

class ProductFormComponentClass extends React.PureComponent<Props> {
    public initialState: State = {
        name: "",
        nameError: "",
        code: "",
        codeError: "",
        price: 0,
        priceError: "",
        photo: null,
        isSubmiting: false,
        isConfirmationOpen: false,
        error: ""
    };
    public state: State = initialState;

    public render(): JSX.Element {
        const { classes } = this.props;
        const { name, code, price, photo, isSubmiting, isConfirmationOpen, error, priceError, codeError, nameError } = this.state;
        return <Paper className={classes.Container}>
            <ProductFormModalComponent
                isOpen={isConfirmationOpen}
                handleClose={this.onModalResponse} />
            <form onSubmit={this.onFormSubmit} className={classes.Center}>
                {this.renderErrorBox(error)}
                <FormControl className={classes.TextField} error={nameError !== ""}>
                    <InputLabel >Name</InputLabel>
                    <Input id="name"
                        placeholder="Product Name"
                        value={name}
                        onChange={this.handleChange("name")} />
                    <FormHelperText>{nameError}</FormHelperText>
                </FormControl>

                <FormControl className={classes.TextField} error={codeError !== ""}>
                    <InputLabel >Code</InputLabel>
                    <Input id="code"
                        placeholder="Product Code"
                        value={code}
                        onChange={this.handleChange("code")} />
                    <FormHelperText>{codeError}</FormHelperText>
                </FormControl>

                <FormControl className={classes.TextField} error={priceError !== ""}>
                    <InputLabel >Price</InputLabel>
                    <Input
                        id="price"
                        value={price}
                        type="number"
                        placeholder="Product Code"
                        onChange={
                            this.handleChange("price", (val) => parseInt(val) > 0, "Number must be higher than 0")} />
                    <FormHelperText>{priceError}</FormHelperText>
                </FormControl>
                <div>
                    {photo != null ? photo.name : null}
                </div>
                <Button
                    className={classes.Button}
                    variant="contained"
                    component="label"
                >Upload File
                        <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.onChange} />
                </Button>
                <br />
                <Button
                    className={classes.Button}
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={isSubmiting || (priceError !== "" || nameError !== "" || codeError !== "")}>Submit</Button>
            </form>
        </Paper>;
    }

    private renderErrorBox = (error: string) => {
        const { classes } = this.props;
        if (error === "")
            return null;
        return <div className={classes.Alert}>
            {error}
        </div>;
    }

    private onModalResponse = (isConfirmed: boolean) => () => {
        this.setState({ isConfirmationOpen: false });
        if (isConfirmed) {
            this.submit();
        }
    }

    private onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { price } = this.state;
        if (price > 999) {
            this.setState({ isConfirmationOpen: true });
            return;
        }
        this.submit();
    }

    private submit = () => {
        const { name, code, price, photo } = this.state;
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Code", code);
        formData.append("Price", price.toString());
        if (photo != null) {
            formData.append("Photo", photo);
        }
        // todo: move API logic into separate file
        const baseURL: string = "http://localhost:5000/api";
        const request = axios.create({
            baseURL,
            headers: {
                Accept: "multipart/form-data"
            }
        });
        request
            .post(`/product/v1.1`, formData)
            .then(res => {
                this.setState(this.initialState);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    private handleChange = (name: string, isValid: (val: string) => boolean = (val) => val !== "", error: string = "Field is Required"): React.ChangeEventHandler<HTMLInputElement> =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            console.log(value);
            this.setState({
                [name + "Error"]: !isValid(value) ? error : "",
                [name]: event.target.value,
            });
        }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null || e.target.files.length === 0)
            return;
        const files = Array.from(e.target.files);
        this.setState({
            photo: files[0]
        });
    }
}

export const ProductFormComponent = withStyles(ProductsContainerStyles)(ProductFormComponentClass);