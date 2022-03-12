import React from "react";
import { Grid, Typography } from "@mui/material";

import {
    GeneralPropertyValidation
} from "./validation/GeneralPropertyValidation";
import { ArrayPropertyValidation } from "./validation/ArrayPropertyValidation";
import { EnumValues } from "../../models";
import DebouncedTextField from "../../form/components/DebouncedTextField";
import { SmallSwitch } from "../../form/components/SmallSwitch";

import { Field, getIn, useFormikContext } from "formik";

export function FieldUploadPropertyFieldAdvanced({
                                                     multiple,
                                                 }: {
    multiple: boolean;
}) {
    const {
        values,
        handleChange,
        errors,
        setFieldValue,
        touched
    } = useFormikContext<EnumValues>();

    const baseStoragePath = multiple ? "of.storage" : "storage";

    const metadata = `${baseStoragePath}.metadata`;
    const fileName = `${baseStoragePath}.fileName`;
    const storagePath = `${baseStoragePath}.storagePath`;
    const storeUrl = `${baseStoragePath}.storeUrl`;

    const fileNameValue = getIn(values, fileName) ?? "{file}";
    const storagePathValue = getIn(values, storagePath) ?? "/";

    return (
        <>

            {!multiple && <Grid item>
                <GeneralPropertyValidation/>
            </Grid>}
            {multiple && <Grid item>
                <ArrayPropertyValidation/>
            </Grid>}

            <Grid item container spacing={2}>
                <Grid item xs={12}>
                    <Field name={fileName}
                           as={DebouncedTextField}
                           label={"File name"}
                           size={"small"}
                           value={fileNameValue}
                           fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Field name={storagePath}
                           as={DebouncedTextField}
                           label={"Storage path"}
                           size={"small"}
                           value={storagePathValue}
                           fullWidth/>
                    <Typography variant={"caption"}>
                        <p>You can use the following placeholders in the file name
                            and storage path values:</p>
                        <ul>
                            <li>{"{file} - Full file name"}</li>
                            <li>{"{file.name} - Name of the file without extension"}</li>
                            <li>{"{file.ext} - Extension of the file"}</li>
                            <li>{"{entityId} - Id of the entity"}</li>
                            <li>{"{propertyId} - Id of this property"}</li>
                            <li>{"{path} - Path of this entity"}</li>
                        </ul>
                    </Typography>
                    <Field type="checkbox"
                           name={storeUrl}
                           label={"Save URL instead of storage path"}
                           component={SmallSwitch}/>
                    <br/>
                    <Typography variant={"caption"}>
                        Turn this setting on, if you prefer to save the download
                        URL of the uploaded file instead of the storage path.
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

