import { stringReplaceFilter } from './string-replace-filter';

/**
 * @Description remove the file Extension, exp: 'name.exe' will return 'name'
 */
export const removeFileExtensionFilter = (fileName: string) =>
  fileName
    ? stringReplaceFilter(fileName, `.${fileName.split('.').pop()}`, '').trim()
    : '';
