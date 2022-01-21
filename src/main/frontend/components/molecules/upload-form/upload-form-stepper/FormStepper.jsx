import { Form, Formik } from 'formik';
import React, { Children, useState } from 'react';
import Button from '../../../atoms/button/Button';
import { BUTTON_VARIANT } from '../../../atoms/button/buttonVariants';

const FormStepper = props => {
    /**
     * Props
     */
    const { children, ...formikProps } = props;

    /**
     * State
     */
    const [step, setStep] = useState(0);

    /**
     * Variables
     */
    const childrenArray = Children.toArray(children);
    const activeStepContent = childrenArray[step];

    /**
     * Sub-Logic, Callbacks
     */
    const nextStep = () => {
        setStep(step + 1 < childrenArray.length ? step + 1 : step);
    };

    /**
     * Render
     */
    return (
        <Formik {...formikProps}>
            <Form>
                <p>Schritt {step + 1}</p>
                {activeStepContent}
                <Button variant={BUTTON_VARIANT.BTN_PRIMARY} onClick={nextStep}>
                    Weiter
                </Button>
            </Form>
        </Formik>
    );
};

export default FormStepper;
