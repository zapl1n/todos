import express, { Request, Response, NextFunction } from 'express';


// Define a type for route handlers
type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void | express.Response>;

// This function is used to wrap route handlers in a try/catch block in order to catch any errors that may be thrown from the route handler.
export const handleErrors = (routeHandler: RouteHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Call the route handler
      return await routeHandler(req, res, next);
    } catch (err) {
      // Pass the error to the next() function, which will trigger the error handling middleware provided by Express
      next(err);
    }
  };
};
