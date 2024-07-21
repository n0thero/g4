import * as t3 from "three";
import BaseGround from "./BaseGround.ts";
import {g3, game} from "../../InitGame.ts";
import {TEXTURES_DIR} from "../../utils/paths.ts";

export default class GridGround extends BaseGround {

    constructor() {

        const txrBase = g3.textureLoader.load(`${TEXTURES_DIR}/env/txr-earth-2-base.jpg`, g3.textureScaleHandler);
        const txrHeight = g3.textureLoader.load(`${TEXTURES_DIR}/env/txr-earth-2-height.png`, g3.textureScaleHandler);
        const txrNormal = g3.textureLoader.load(`${TEXTURES_DIR}/env/txr-earth-2-normal.jpg`, g3.textureScaleHandler);

        let new_mesh = new t3.Mesh(
            new t3.PlaneGeometry(15000, 15000, 32, 32),
            new t3.MeshStandardMaterial({
                map: txrBase,
                normalMap: txrNormal,
                displacementMap: txrHeight,
                side: t3.DoubleSide
            })
        );

        super(new_mesh);
    }
}
