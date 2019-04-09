import React from 'react';

const FormField = ({id, formdata, change}) => {

    const showError = () => {
        let errorMessage = <div className="error-label">
            {
                formdata.validation && !formdata.valid ? 
                    formdata.validationMessage 
                : null
            }
        </div>
        return errorMessage;
    }

    const template = () => {
        let fromTemplate = null;

        switch(formdata.element) {
            case('input'):
                fromTemplate = (
                    <div>
                        <input 
                            {...formdata.config} //will include all the configs
                            value={formdata.value}
                            onChange={(event) => change({event, id})}
                        />
                        { showError()}
                    </div>  
                )
                break;
            default:
                fromTemplate = null
        }
        return fromTemplate;
    }
    return (
        <div>{template()}</div>
    )
}

export default FormField;