import * as t3 from "three";

export default class SceneLights {

    ambient: t3.AmbientLight;
    directional: t3.DirectionalLight;
    other: t3.Light[];

    private light_ambient_color_default: t3.ColorRepresentation = 0x404040;
    private light_directional_color_default: t3.ColorRepresentation = 0xfff;
    private light_directional_intensity_default: number = 1;

    constructor() {

        this.ambient = new t3.AmbientLight(this.light_ambient_color_default);

        this.directional = new t3.DirectionalLight(
            this.light_directional_color_default,
            this.light_directional_intensity_default);

        this.other = [];

        this.directional.position.set(50, 50, 100);
        this.directional.castShadow = true;

        this.directional.shadow.mapSize.width = 1024;
        this.directional.shadow.mapSize.height = 1024;
        this.directional.shadow.camera.near = 0.5;
        this.directional.shadow.camera.far = 500;
        this.directional.shadow.camera.left = -50;
        this.directional.shadow.camera.right = 50;
        this.directional.shadow.camera.top = 50;
        this.directional.shadow.camera.bottom = -50;
    }

    init(scene: t3.Scene) {
        scene.add(this.ambient);
        scene.add(this.directional);

        if (this.other.length) {

            this.other.forEach(light => {
                scene.add(light);
            });
        }
    }
}
