declare module '*.jpg'
declare module "react-social-icons" {
    export class SocialIcon extends React.Component<any> {
    }
}

declare var __PATH_PREFIX__:string;

declare module "typography-theme-twin-peaks" {

}

declare module "typography" {
    declare class Typography {
        rhythm: any;
        scale: any;
        constructor(opts: TypographyOptions);
        options: TypographyOptions;
        createStyles(): string;
        toJSON(): object;
        injectStyles(): void;
    }

    export default Typography;
}