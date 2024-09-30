import {Listener} from "./Listener";

export default class Config {

    private listeners: { [key: string]: Listener<any>[] } = {};

    private store: { [key: string]: any } = {};

    public keys: { [key: string]: string } = {
        video__antialias_is_on: 'video__antialias_is_on'
    };

    private initDefault(): void {

        this.store[this.keys.video__antialias_is_on] = Boolean(this.get(
            this.keys.video__antialias_is_on,
            false));


    }

    //region Main

    constructor() {
        this.initDefault();
    }

    private triggerListeners<T>(key: string, value: T): void {
        if (this.listeners[key]) {
            this.listeners[key].forEach(listener => listener(value));
        }
    }

    public set<T>(key: string, new_value: T): void {
        localStorage.setItem(key, JSON.stringify(new_value));
        this.store[key] = new_value;
        this.triggerListeners(key, new_value);
    }

    public get<T>(key: string, default_value: T): T {

        const storedValue = localStorage.getItem(key);

        if (storedValue === null) {
            return default_value;
        }

        try {
            return JSON.parse(storedValue);
        } catch (error) {
            console.error(`Error parsing config value for key: ${key}`);
            return default_value;
        }
    }

    public onChange<T>(key: string, listener: Listener<T>): void {

        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(listener);
    }

    //endregion

    //region UI

    public renderSettings(): void {
        const keys = {
            video__antialias_is_on: this.keys.video__antialias_is_on
        }

        document.body.insertAdjacentHTML('beforeend', `
        <div id="settings">

          <div class="input-group">
            <input type="checkbox" 
                   id="${keys.video__antialias_is_on}"
                   ${this.get(this.keys.video__antialias_is_on, false) ? 'checked' : ''}>
            <label for="${keys.video__antialias_is_on}">
              Video: antialiasing
            </label>
          </div>
          
        </div>
        `);

        this.bindUIListeners();
    }

    private bindUIListeners(): void {

        document.getElementById('settings')!
            .addEventListener('change', event => {

                const target = event.target as HTMLInputElement;

                switch (target.id) {

                    case this.keys.video__antialias_is_on:
                        this.set<boolean>(target.id, target.checked);
                        break;
                }
            });
    }

    //endregion
}
