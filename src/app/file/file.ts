export class File {
  id: number | null = null;
  name: string = '';
  status?: boolean;
  fileContent: string | ArrayBuffer | null = ''
}
