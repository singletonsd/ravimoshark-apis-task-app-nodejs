"use strict";

import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";

const SERVICE_NAME = "TasksService";
export class TasksService {

  /**
   * Add one task.
   * Add one task.
   *
   * body Tasks
   * returns Tasks
   */
  public static add(body) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Delete one task.
   * Delete one task.
   *
   * id Long id to delete or search
   * returns IdInteger
   */
  public static delete(id) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Edit one task.
   * Edit one task.
   *
   * body Tasks
   * returns Tasks
   */
  public static edit(body) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Get one task.
   * Get one task.
   *
   * id Long id to delete or search
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * returns Tasks
   */
  public static getById(params: ParametersIdDeleted) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Get all tasks.
   * Get all tasks.
   *
   * skip Integer number of item to skip (optional)
   * limit Integer max records to return (optional)
   * orderBy String order by property. (optional)
   * filterBy String filter data. (optional)
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * metadata Boolean If metadata is needed (for pagination controls) (optional)
   * refClient String Data from a desired contract (optional)
   * returns inline_response_200
   */
  public static get(params: ParametersComplete) {
    return new Promise((resolve, reject) => {
      const examples = {};
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

}
