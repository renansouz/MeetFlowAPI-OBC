export interface DeleteParams {
  fileName: string
}

export abstract class Delete {
  abstract delete(params: DeleteParams): Promise<boolean>
}