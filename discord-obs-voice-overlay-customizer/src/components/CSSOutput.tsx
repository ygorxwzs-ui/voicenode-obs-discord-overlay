import React, { useState } from 'react';
import { Copy, Check, Code, FileCode, Upload, HelpCircle, Image as ImageIcon } from 'lucide-react';

interface CSSOutputProps {
  css: string;
}

export default function CSSOutput({ css }: CSSOutputProps) {
  const [copied, setCopied] = useState(false);
  const [encodedBase64, setEncodedBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isCopyingBase64, setIsCopyingBase64] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEncodedBase64(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyBase64 = () => {
    if (!encodedBase64) return;
    navigator.clipboard.writeText(encodedBase64);
    setIsCopyingBase64(true);
    setTimeout(() => setIsCopyingBase64(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* CSS Code Output Card */}
      <div className="bg-[#15191d] rounded-2xl border border-[#22272e] shadow-xl overflow-hidden flex flex-col h-[500px]">
        {/* Card Header */}
        <div className="bg-[#0b0e11] px-6 py-4 border-b border-[#22272e] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#5865f2]" />
            <div>
              <h3 className="text-sm font-semibold text-white">Código CSS Gerado</h3>
              <p className="text-xs text-gray-400">Copie e cole nas propriedades do Navegador no OBS</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              copied
                ? 'bg-[#2eb086]/10 text-[#2eb086] border border-[#2eb086]/20'
                : 'bg-[#5865f2] hover:bg-[#4752c4] text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar Código CSS
              </>
            )}
          </button>
        </div>

        {/* Code Block Container */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-gray-300 leading-relaxed bg-[#0b0e11]">
          <pre className="whitespace-pre-wrap select-all">{css}</pre>
        </div>
      </div>

      {/* Base64 Converter Tool Card */}
      <div className="bg-[#15191d] p-5 rounded-2xl border border-[#22272e] shadow-xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg flex-shrink-0">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Conversor de Imagem Local para Base64</h4>
            <p className="text-xs text-gray-400">
              Transforme um ícone do seu computador em um código para usar direto no CSS. Isso evita que você precise hospedar a imagem na internet!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upload Input Area */}
          <div className="border-2 border-dashed border-[#22272e] hover:border-purple-500/40 rounded-xl p-4 transition-all flex flex-col items-center justify-center text-center space-y-2 bg-[#0b0e11]">
            <input
              type="file"
              accept="image/*"
              id="base64-file-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="base64-file-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              {encodedBase64 ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={encodedBase64}
                    alt="Uploaded thumbnail"
                    className="w-12 h-12 rounded-xl object-cover border border-purple-500"
                  />
                  <span className="text-xs text-emerald-400 font-medium max-w-[180px] truncate">
                    {fileName} carregado!
                  </span>
                  <span className="text-[10px] text-gray-500">Clique para alterar</span>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 bg-purple-500/5 text-purple-400/70 rounded-full">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Carregar Imagem</span>
                  <span className="text-[10px] text-gray-500">PNG, JPG ou GIF até 1MB</span>
                </div>
              )}
            </label>
          </div>

          {/* Action / Result Area */}
          <div className="flex flex-col justify-center space-y-3 bg-[#0b0e11] p-4 rounded-xl border border-[#22272e]">
            {encodedBase64 ? (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block">Código Base64 Gerado</span>
                  <p className="text-[11px] text-gray-400 line-clamp-2 break-all font-mono">
                    {encodedBase64}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyBase64}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      isCopyingBase64
                        ? 'bg-[#2eb086]/10 text-[#2eb086] border border-[#2eb086]/20'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {isCopyingBase64 ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Link Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar Código Base64
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEncodedBase64('');
                      setFileName('');
                    }}
                    className="px-3 py-2 rounded-lg border border-[#22272e] text-gray-400 hover:text-white text-xs font-semibold hover:bg-[#15191d] cursor-pointer"
                  >
                    Limpar
                  </button>
                </div>
                <span className="text-[10px] text-gray-500 leading-tight">
                  💡 Cole o link copiado no campo "URL do Avatar" do seu usuário na configuração ao lado para usá-lo automaticamente!
                </span>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500 space-y-1">
                <HelpCircle className="w-5 h-5 mx-auto text-gray-600" />
                <p className="text-xs">Nenhuma imagem carregada no momento.</p>
                <p className="text-[10px] text-gray-600">Arraste ou clique para carregar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
