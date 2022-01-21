import React from 'react';
import FormStepper from '../../molecules/upload-form/upload-form-stepper/FormStepper';
import Step1NotARobot from '../../molecules/upload-form/upload-steps/upload-step-1/Step1NotARobot';
import Step2UploadFile from '../../molecules/upload-form/upload-steps/upload-step-2/Step2UploadFile';
import Step3RenameUpload from '../../molecules/upload-form/upload-steps/upload-step-3/Step3RenameUpload';
import Step4SummaryThankYou from '../../molecules/upload-form/upload-steps/upload-step-4/Step4SummaryThankYou';

const UploadMultistepForm = () => {
    // TODO: InitialValues -> put response of Upload Name inside redux state
    // Don't forget to clear it when done with uploading or discarding the editing

    const formFields = {
        title: ''
    };

    return (
        <FormStepper enableReinitialize={true} initialValues={formFields}>
            <Step1NotARobot />
            <Step2UploadFile />
            <Step3RenameUpload />
            <Step4SummaryThankYou />
        </FormStepper>
    );
};

export default UploadMultistepForm;
