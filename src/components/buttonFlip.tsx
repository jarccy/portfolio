"use client"

import { useState, useRef, useLayoutEffect } from "react"

interface ButtonFlipModalProps {
    buttonText?: string
    modalTitle?: string
    modalContent?: React.ReactNode
}

interface Position {
    top: number
    left: number
    width: number
    height: number
}

export function ButtonFlipModal({
    buttonText = "Abrir Modal",
    modalTitle = "Modal Expandido",
    modalContent,
}: ButtonFlipModalProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [buttonPosition, setButtonPosition] = useState<Position | null>(null)
    const buttonRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (buttonRef.current && !isExpanded) {
            const rect = buttonRef.current.getBoundingClientRect()
            setButtonPosition({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            })
        }
    }, [isExpanded])

    const handleOpen = () => {
        if (isAnimating || !buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        setButtonPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        })

        setIsAnimating(true)
        requestAnimationFrame(() => {
            setIsExpanded(true)
        })
    }

    const handleClose = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setIsExpanded(false)
    }

    const handleTransitionEnd = () => {
        setIsAnimating(false)
    }

    const getModalDimensions = () => {
        if (typeof window === "undefined") return { width: 512, height: 320, left: 0, top: 0 }
        const width = Math.min(window.innerWidth * 0.9, 512)
        const height = 420
        const left = (window.innerWidth - width) / 2
        const top = (window.innerHeight - height) / 2
        return { width, height, left, top }
    }

    const modal = getModalDimensions()

    return (
        <>
            {/* Placeholder to maintain layout */}
            <div
                ref={buttonRef}
                className="px-6 py-3 rounded-full inline-block"
            >
                <span className="invisible">{buttonText}</span>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-foreground/60 backdrop-blur-sm transition-opacity duration-300 ${isExpanded ? "opacity-100 z-40" : "opacity-0 pointer-events-none -z-10"
                    }`}
                onClick={handleClose}
            />

            {/* Button / Modal */}
            {buttonPosition && (
                <div
                    onClick={!isExpanded ? handleOpen : undefined}
                    onTransitionEnd={handleTransitionEnd}
                    className={`
            fixed overflow-hidden z-50
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            bg-primary text-primary-foreground font-medium shadow-lg
            ${isExpanded ? "cursor-default" : "cursor-pointer hover:scale-105 active:scale-95"}
          `}
                    style={{
                        top: isExpanded ? modal.top : buttonPosition.top,
                        left: isExpanded ? modal.left : buttonPosition.left,
                        width: isExpanded ? modal.width : buttonPosition.width,
                        height: isExpanded ? modal.height : buttonPosition.height,
                        borderRadius: isExpanded ? 16 : buttonPosition.height / 2,
                    }}
                >
                    {/* Button Text - fades out */}
                    <span
                        className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-200
            ${isExpanded ? "opacity-0 scale-110 blur-md" : "opacity-100 duration-500 scale-100 blur-none"}
          `}
                    >
                        {buttonText}
                    </span>

                    {/* Modal Content - fades in */}
                    <div
                        className={`
            absolute inset-0 p-6 flex flex-col
            transition-all duration-500
            ${isExpanded ? "opacity-100 blur-none scale-100" : "opacity-0 blur-md scale-95 pointer-events-none"}
          `}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">{modalTitle}</h2>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClose()
                                }}
                                className="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <span className="w-5 h-5" >X  </span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 text-left">
                            {modalContent || (
                                <div className="space-y-4">
                                    <p className="text-primary-foreground/80">
                                        Este es un modal que se expande desde un botón con una animación suave.
                                    </p>
                                    <p className="text-primary-foreground/80">
                                        Puedes personalizar el contenido pasando la prop <code className="bg-primary-foreground/20 px-1 rounded">modalContent</code>.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-primary-foreground/20">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClose()
                                }}
                                className="px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClose()
                                }}
                                className="px-4 py-2 rounded-lg bg-primary-foreground text-primary hover:opacity-90 transition-opacity text-sm font-medium"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}