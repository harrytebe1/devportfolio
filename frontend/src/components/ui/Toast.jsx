import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Toast = ({ show, type = 'success', message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className={cn(
            "flex items-center p-4 rounded-card border shadow-lg bg-bg-surface-elevated text-text-primary min-w-[300px]",
            type === 'success' ? 'border-state-success' : 'border-state-error'
          )}>
            <div className="flex-shrink-0 mr-3">
              {type === 'success' ? (
                <CheckCircle className="text-state-success" size={24} />
              ) : (
                <XCircle className="text-state-error" size={24} />
              )}
            </div>
            <div className="flex-1 font-medium">{message}</div>
            <button onClick={onClose} className="ml-4 text-text-secondary hover:text-text-primary">
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
