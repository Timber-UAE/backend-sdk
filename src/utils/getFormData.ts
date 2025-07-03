type UniversalFormData = FormData | import('form-data');

export async function getFormData(): Promise<{
  formData: UniversalFormData;
  headers: Record<string, string>;
}> {
  if (typeof window === 'undefined') {
    const FormDataNode = (await import('form-data')).default;
    const formData = new FormDataNode();
    return { formData, headers: formData.getHeaders() };
  } else {
    const formData = new FormData();
    return { formData, headers: {} };
  }
}
