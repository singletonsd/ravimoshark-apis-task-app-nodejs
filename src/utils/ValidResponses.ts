// TODO: improve format to apply a translation.
export const VALID_RESPONSES = {
    ERROR: {
        AUTH: {
            TOKEN: {
                APP: "error.auth.token.app",
                USER: "error.auth.token.user"
            },
            UNPRIVILEGED: "error.auth.unprivileged"
        },
        EXIST: {
            TASK: "error.exist.task",
            TECHNICIAN: "error.exist.technician",
            VISIT: "error.exist.visit"
        },
        NOT_DELETED: "error.not_deleted",
        NOT_EXIST: {
            TASK: "error.not_exist.task",
            TECHNICIAN: "error.not_exist.technician",
            VISIT: "error.not_exist.visit"
        },
        PARAMS: {
            MALFORMED: {
                ORDERBY: "error.params.malformed.orderby"
            },
            MISSING: "error.params.missing"
        },
        UNRECOGNIZED: "error.unrecognized",
        VALIDATION: {
            ID: "error.validation.id",
            NAME: "error.validation.name",
            URL: "error.validation.url"
        }
    }
};
