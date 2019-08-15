#version 140

precision mediump float;

uniform sampler2D uSampler;
uniform vec4 uColor;

in vec2 vTexCoord;
out vec4 fragColor;

void main()
{
    // Texel color look up based on interpolated UV value in vTexCoord
    vec4 c = texture(uSampler, vec2(vTexCoord.s, 1 - vTexCoord.t));
    // Tint the textured area, and leave transparent area as defined by the texture
    vec3 r = vec3(c) * (1.0-uColor.a) + vec3(uColor) * uColor.a;
    vec4 result = vec4(r, c.a);
    fragColor = result;
}