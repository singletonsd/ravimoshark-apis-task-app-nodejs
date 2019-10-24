"use strict";

import { Tasks } from "../databases/entities";
import { TasksService } from "../service";
import { CustomNext, CustomRequest, CustomResponse } from "../utils/customsHandlers";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { ResponsePayload } from "../utils/writer";

module.exports.addTask = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body: Tasks = Utilities.checkVariableNotNull(req.swagger.params.undefined.originalValue, res);
  if (!body) {
    return;
  }
  TasksService.add(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.deleteTask = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const refContract = Utilities.checkIdAndDelete(req.swagger.params, res);
  if (!refContract) {
    return;
  }
  TasksService.delete(refContract)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.editTask = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body: Tasks = Utilities.checkVariableNotNull(req.swagger.params.undefined.originalValue, res);
  if (!body) {
    return;
  }
  TasksService.edit(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getTaskById = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersIdDeleted = Utilities.checkIdAndDelete(req.swagger.params, res);
  if (!params) {
      return;
  }
  TasksService.getById(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getTasks = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersComplete = Utilities.checkAllParametersGet(req.swagger.params, res);
  if (!params) {
    return;
  }
  TasksService.get(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};
