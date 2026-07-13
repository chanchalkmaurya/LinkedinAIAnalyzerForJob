import { FaLinkedin } from "react-icons/fa";
import { InputHTMLAttributes, forwardRef } from "react";

interface LinkedInInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const LinkedInInput = forwardRef<HTMLInputElement, LinkedInInputProps>(
    ({ error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label
                    htmlFor="linkedin_url"
                    className="block text-sm font-medium text-zinc-300"
                >
                    LinkedIn Profile URL
                </label>

                <div className="relative">
                    <FaLinkedin
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0A66C2]"
                    />

                    <input
                        ref={ref}
                        id="linkedin_url"
                        type="url"
                        placeholder="https://www.linkedin.com/in/johndoe"
                        {...props}
                        className={`w-full rounded-xl border bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none transition-all
                        ${
                            error
                                ? "border-red-500"
                                : "border-zinc-700 focus:border-blue-500"
                        }
                        placeholder:text-zinc-500
                        disabled:cursor-not-allowed
                        disabled:opacity-60`}
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

LinkedInInput.displayName = "LinkedInInput";

export default LinkedInInput;