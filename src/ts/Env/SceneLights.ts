import * as t3 from "three";

export default class SceneLights {

    ambient: t3.AmbientLight;
    directional: t3.DirectionalLight;
    other: t3.Light[];

    private light_ambient_color_default: t3.ColorRepresentation = 0xffffff;
    private light_directional_color_default: t3.ColorRepresentation = 0xffffff;

    constructor() {

        this.ambient = new t3.AmbientLight(this.light_ambient_color_default, 2);

        this.directional = new t3.DirectionalLight(
            this.light_directional_color_default,
        3);

        this.other = [];

        this.directional.position.set(0, 150, -70);
        this.directional.castShadow = true;

        this.directional.shadow.mapSize.width = 2048;
        this.directional.shadow.mapSize.height = 2048;

        this.directional.shadow.camera.near = 0.5;
        this.directional.shadow.camera.far = 150000;

        this.directional.shadow.camera.left = -500;
        this.directional.shadow.camera.right = 500;
        this.directional.shadow.camera.top = 500;
        this.directional.shadow.camera.bottom = -500;
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
