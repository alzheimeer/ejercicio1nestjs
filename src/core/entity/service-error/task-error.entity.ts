import { Etask, ETaskDesc } from "src/common/utils/enums/taks.enum";

export interface ITaskError {
    task_name: Etask,
    task_description: ETaskDesc,
    description?:any,
}
