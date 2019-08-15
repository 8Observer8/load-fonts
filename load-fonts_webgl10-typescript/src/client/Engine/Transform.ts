import { vec2, mat4, vec3 } from "gl-matrix";

export default class Transform
{
    private _position = vec2.fromValues(0, 0);
    private _scale = vec2.fromValues(1, 1);
    private _rotationInRad = 0.0;

    public SetPosition(xPos: number, yPos: number)
    {
        this.XPos = xPos;
        this.YPos = yPos;
    }

    public GetPosition(): Float32Array
    {
        return this._position;
    }

    public set XPos(xPos: number)
    {
        this._position[0] = xPos;
    }

    public get XPos(): number
    {
        return this._position[0];
    }

    public set YPos(yPos: number)
    {
        this._position[1] = yPos;
    }

    public get YPos(): number
    {
        return this._position[1];
    }

    public IncXPosBy(delta: number)
    {
        this._position[0] += delta;
    }

    public IncYPosBy(delta: number)
    {
        this._position[1] += delta;
    }

    public IncRotationByDegree(rotationInDegree: number)
    {
        this.RotationInRad += rotationInDegree * Math.PI / 180.0;
    }

    public IncRotationByRad(deltaRad: number)
    {
        this.RotationInRad += this._rotationInRad + deltaRad;
    }

    public get RotationInRad()
    {
        return this._rotationInRad;
    }

    public set RotationInRad(value: number)
    {
        this._rotationInRad = value;
        while (this._rotationInRad > (2.0 * Math.PI))
        {
            this._rotationInRad -= (2.0 * Math.PI);
        }
    }

    public get RotationInDegree()
    {
        return this._rotationInRad * 180.0 / Math.PI;
    }

    public set RotationInDegree(value: number)
    {
        this.RotationInRad = value * Math.PI / 180.0;
    }

    public SetSize(width: number, height: number)
    {
        this.Width = width;
        this.Height = height;
    }

    public get Width()
    {
        return this._scale[0];
    }

    public set Width(value: number)
    {
        this._scale[0] = value;
    }

    public get Height()
    {
        return this._scale[1];
    }

    public set Height(value: number)
    {
        this._scale[1] = value;
    }

    public GetModelTransform(): mat4
    {
        let matrix = mat4.create();

        mat4.translate(matrix, matrix, vec3.fromValues(this.XPos, this.YPos, 0.0));
        mat4.rotateZ(matrix, matrix, this.RotationInRad);
        mat4.scale(matrix, matrix, vec3.fromValues(this.Width, this.Height, 1.0));

        return matrix;
    }
}
