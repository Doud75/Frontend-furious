export const SET_FORM_DATA = 'SET_FORM_DATA';

export const setFormData = (formData: any) => ({
    type: SET_FORM_DATA,
    payload: formData,
});