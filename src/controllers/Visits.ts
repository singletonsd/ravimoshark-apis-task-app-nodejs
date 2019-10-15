"use strict";

import { VisitsService } from "../service";
import { CustomNext, CustomRequest, CustomResponse } from "../utils/customsHandlers";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { ResponsePayload } from "../utils/writer";

module.exports.addVisit = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull(req.swagger.params.undefined.originalValue, res);
  if (!body) {
    return;
  }
  VisitsService.add(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.deleteVisit = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const refContract = Utilities.checkIdAndDelete(req.swagger.params, res);
  if (!refContract) {
    return;
  }
  VisitsService.delete(refContract)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.editVisit = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull(req.swagger.params.undefined.originalValue, res);
  if (!body) {
    return;
  }
  VisitsService.edit(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getVisitById = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersIdDeleted = Utilities.checkIdAndDelete(req.swagger.params, res);
  if (!params) {
      return;
  }
  VisitsService.getById(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getVisits = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersComplete = Utilities.checkAllParametersGet(req.swagger.params, res);
  if (!params) {
    return;
  }
  VisitsService.get(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};
