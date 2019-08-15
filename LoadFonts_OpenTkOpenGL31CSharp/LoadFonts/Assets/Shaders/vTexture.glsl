#version 140

in vec3 aPosition;
in vec2 aTexCoord;
out vec2 vTexCoord;
uniform mat4 uVPMatrix;
uniform mat4 uModelMatrix;

void main()
{
    gl_Position = uVPMatrix * uModelMatrix * vec4(aPosition, 1.0);
    vTexCoord = aTexCoord;
}