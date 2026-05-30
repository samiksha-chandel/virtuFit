import React from 'react';
import { motion } from 'framer-motion';
import { Upload, ScanFace, Ratio, Map, Settings2, Palette, CheckCircle2, Loader2, Cpu } from 'lucide-react';

const stages = [
  { icon: Upload, message: 'Uploading image...' },
  { icon: ScanFace, message: 'Detecting body landmarks...' },
  { icon: Ratio, message: 'Analyzing proportions...' },
  { icon: Map, message: 'Mapping garment placement...' },
  { icon: Settings2, message: 'Optimizing fit...' },
  { icon: Palette, message: 'Rendering result...' },
  { icon: CheckCircle2, message: 'Finalizing preview...' }
];

export default function AIProgress({ currentStage }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card p-8">
        <div className="flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center"
          >
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        <div className="space-y-4">
          {stages.map((stage, index) => {
            const isActive = index + 1 === currentStage;
            const isComplete = index + 1 < currentStage;
            const Icon = stage.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 ${
                  isActive ? 'text-white' : isComplete ? 'text-green-400' : 'text-white/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-primary animate-pulse' : isComplete ? 'bg-green-500/20' : 'bg-white/5'
                }`}>
                  {isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isComplete ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-medium">{stage.message}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStage / stages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <p className="text-center text-white/60 text-sm mt-4">
          {Math.round((currentStage / stages.length) * 100)}% Complete
        </p>
      </div>
    </div>
  );
}