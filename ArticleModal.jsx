import React, { useState } from 'react';
import { X, Clock, Calendar, Share2, Heart, Check, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function ArticleModal({ post, isOpen, onClose }) {
    const [likes, setLikes] = useState(12);
    const [liked, setLiked] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!isOpen || !post) return null;

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
            toast.success("Thanks for the feedback! ❤️");
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    };

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            toast.success("Article link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-3xl max-h-[90vh] bg-[#121212] border border-[#2A2A2A] rounded-lg shadow-2xl flex flex-col overflow-hidden text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A] bg-[#0E0E0E]">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                            {post.tag}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-[#9CA3AF] hover:text-white border border-[#2A2A2A] hover:border-red-500/50 rounded transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Article Content Body */}
                <div className="p-6 md:p-10 overflow-y-auto space-y-6 flex-1 text-[#D1D5DB]">
                    <div>
                        <div className="flex items-center gap-4 text-xs font-mono text-[#9CA3AF] mb-3">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.read}
                            </span>
                        </div>
                        <h1 className="font-display text-2xl md:text-4xl text-white font-bold tracking-tight leading-tight">
                            {post.title}
                        </h1>
                        <p className="mt-4 text-lg text-[#9CA3AF] font-light italic border-l-2 border-accent pl-4">
                            "{post.excerpt}"
                        </p>
                    </div>

                    <div className="border-t border-[#2A2A2A] pt-6 space-y-4 text-base leading-relaxed text-[#E5E7EB]">
                        {post.content ? (
                            <div className="space-y-4 whitespace-pre-line font-body">
                                {post.content.trim()}
                            </div>
                        ) : (
                            <p>Full article coming soon. Stay tuned!</p>
                        )}
                    </div>
                </div>

                {/* Footer Toolbar */}
                <div className="px-6 md:px-10 py-4 border-t border-[#2A2A2A] bg-[#0E0E0E] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border font-mono text-xs transition-colors ${
                                liked 
                                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                                    : 'border-[#2A2A2A] text-[#9CA3AF] hover:text-white hover:border-[#444]'
                            }`}
                        >
                            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-400' : ''}`} />
                            <span>{likes} Claps</span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#2A2A2A] text-[#9CA3AF] hover:text-white hover:border-[#444] font-mono text-xs transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                            <span>{copied ? "Link Copied" : "Share"}</span>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-accent hover:bg-[#FF8B33] text-white px-5 py-2 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        Done Reading
                    </button>
                </div>
            </div>
        </div>
    );
}
