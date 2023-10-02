import { OptionsType } from "./OptionsType";

export type Setting = {
    title: string;
    description: string;
    options: OptionsType;
}

export type Settings = {
    identity: Setting,
    notifications: Setting,
    cookies: Setting,
    commercials: Setting,
};