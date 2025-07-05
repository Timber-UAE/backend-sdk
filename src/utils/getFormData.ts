// utils/getFormData.ts
export type BrowserFormDataResult = {
  formData: FormData;
  headers: undefined;
  env: 'browser';
};

export type NodeFormDataResult = {
  formData: import('form-data');
  headers: Record<string, string>;
  env: 'node';
};

export type FormDataResult = BrowserFormDataResult | NodeFormDataResult;

export async function getFormData(): Promise<FormDataResult> {
  if (typeof window === 'undefined') {
    const FormDataNode = (await import('form-data')).default;
    const formData = new FormDataNode();
    return { formData, headers: formData.getHeaders(), env: 'node' };
  } else {
    const formData = new FormData();
    return { formData, headers: undefined, env: 'browser' };
  }
}
