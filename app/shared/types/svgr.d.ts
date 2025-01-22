declare module "*.svg?url" {
  import type { ReactElement, SVGProps } from "react";

  const content: string;
  export default content;
}

declare module "*.svg?svgr" {
  import type { ReactElement, SVGProps } from "react";

  const content: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  export default content;
}
