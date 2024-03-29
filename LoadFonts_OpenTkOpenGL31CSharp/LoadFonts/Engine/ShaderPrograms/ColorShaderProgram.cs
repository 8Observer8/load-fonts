﻿
using OpenTK;
using OpenTK.Graphics;
using OpenTK.Graphics.OpenGL;

namespace Engine
{
    public class ColorShaderProgram
    {
        private int _aPositionLocation;
        private int _colorLocation;
        private int _vpMatrixLocation;
        private int _modelMatrixLocation;

        protected int _shaderProgram;

        public ColorShaderProgram(string vertexShaderPath, string fragmentShaderPath)
        {
            int vShader = CompileShader(vertexShaderPath, ShaderType.VertexShader);
            int fShader = CompileShader(fragmentShaderPath, ShaderType.FragmentShader);
            if (vShader == -1 || fShader == -1) { return; }
            _shaderProgram = GL.CreateProgram();
            GL.AttachShader(_shaderProgram, vShader);
            GL.AttachShader(_shaderProgram, fShader);
            GL.LinkProgram(_shaderProgram);

            // Check the result of the linking
            int status;
            GL.GetProgram(_shaderProgram, GetProgramParameterName.LinkStatus, out status);
            if (status == 0)
            {
                string errorString = string.Format("ColorShaderProgram.cs. Failed to link a shader program. Message: {0}", GL.GetProgramInfoLog(_shaderProgram));
                Logger.Instance.Print(errorString);
                GL.DeleteProgram(_shaderProgram);
                GL.DeleteShader(vShader);
                GL.DeleteShader(fShader);
                return;
            }

            _aPositionLocation = GL.GetAttribLocation(_shaderProgram, "aPosition");
            if (_aPositionLocation < 0)
            {
                Logger.Instance.Print("Failed to get the storage location of aPosition");
                return;
            }

            _colorLocation = GL.GetUniformLocation(_shaderProgram, "uColor");
            if (_colorLocation < 0)
            {
                Logger.Instance.Print("Failed to get the storage location of uColor");
                return;
            }
            _vpMatrixLocation = GL.GetUniformLocation(_shaderProgram, "uVPMatrix");
            if (_vpMatrixLocation < 0)
            {
                Logger.Instance.Print("Failed to get the storage location of uVPMatrix");
                return;
            }
            _modelMatrixLocation = GL.GetUniformLocation(_shaderProgram, "uModelMatrix");
            if (_modelMatrixLocation < 0)
            {
                Logger.Instance.Print("Failed to get the storage location of uModelMatrix");
                return;
            }
        }

        public int ShaderProgram
        {
            get
            {
                return _shaderProgram;
            }
        }

        public void Active(Color4 color, Matrix4 vpMatrix)
        {
            GL.UseProgram(_shaderProgram);
            GL.Uniform4(_colorLocation, color);
            GL.UniformMatrix4(_vpMatrixLocation, false, ref vpMatrix);
            GL.BindBuffer(BufferTarget.ArrayBuffer, VertexBuffer.Instance.SquareVertexBuffer);
            GL.VertexAttribPointer(_aPositionLocation, 3, VertexAttribPointerType.Float, false, 0, 0);
            GL.EnableVertexAttribArray(_aPositionLocation);
        }

        public void LoadObjectTransform(Matrix4 modelMatrix)
        {
            GL.UniformMatrix4(_modelMatrixLocation, false, ref modelMatrix);
        }

        private int CompileShader(string filePath, ShaderType shaderType)
        {
            string shaderSource = (ResourceMap.Instance.RetrieveAsset(filePath) as TextAsset).FileContent;

            if (shaderSource == null)
            {
                Logger.Instance.Print(string.Format("ColorShaderProgram.ts, CompileShader().Failed to load: \"{0}\"", filePath));
                return -1;
            }

            int shader = GL.CreateShader(shaderType);
            GL.ShaderSource(shader, shaderSource);
            GL.CompileShader(shader);

            // Check the result of the compilation
            int status;
            GL.GetShader(shader, ShaderParameter.CompileStatus, out status);
            if (status == 0)
            {
                string errorString = string.Format("Failed to compile \"{0}\" shader. Message: {1}", shaderType.ToString(), GL.GetShaderInfoLog(shader));
                Logger.Instance.Print(errorString);
                GL.DeleteShader(shader);
                return -1;
            }

            return shader;
        }
    }
}