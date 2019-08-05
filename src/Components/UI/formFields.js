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
                        { formdata.showLabel ? 
                            <div className="label-input">
                                {formdata.config.label}
                            </div>
                            : null
                        }
                        <input 
                            {...formdata.config} //will include all the configs
                            value={formdata.value}
                            onChange={(event) => change({event, id})}
                        />
                        { showError()}
                    </div>  
                )
                break;
            case('select'):
                fromTemplate = (
                    <div>
                        { formdata.showLabel ? 
                            <div className="label-input">
                                {formdata.config.label}
                            </div>
                            : null
                        }
                        <select 
                            value={formdata.value}
                            onChange={(event) => change({event, id})}
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        { item.value }
                                    </option>
                                ))
                            }
                        </select>
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