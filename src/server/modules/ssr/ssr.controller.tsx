import React from "react";
import App from "../../../client/App";
import { Controller, Get, Req } from "@nestjs/common";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request } from "express";
import { BaseStore } from "../../../common/store/base";

let assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

@Controller()
export class SSRController {
  @Get()
  public renderSSRIndex(@Req() req: Request) {
    const context = {};
    const rootStore = {
      base: {
        NODE_ENV: process.env.NODE_ENV,
      },
    } as {
      base: Partial<BaseStore>;
    };

    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    return `<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>React Project</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script>
        window.__ROOT__STORE__ = ${JSON.stringify(rootStore)};
      </script>
      ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ""}
      ${process.env.NODE_ENV === "production" ? `<script src="${assets.client.js}" defer></script>` : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
  </html>`;
  }
}
