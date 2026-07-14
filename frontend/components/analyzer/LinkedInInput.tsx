import { FaLinkedin } from "react-icons/fa";
import { InputHTMLAttributes, forwardRef } from "react";

interface LinkedInInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const LinkedInInput = forwardRef<HTMLInputElement, LinkedInInputProps>(
    ({ error, ...props }, ref) => {
        return (
            <div className="space-y-3">
                <label
                    htmlFor="linkedin_url"
                    className="text-sm font-semibold text-zinc-200"
                >
                    LinkedIn Profile URL
                </label>

                <div
                    className={`
                        group
                        flex
                        items-center
                        rounded-2xl
                        border
                        bg-zinc-950/60
                        transition-all
                        duration-300
                        ${
                            error
                                ? "border-red-500"
                                : "border-zinc-800 focus-within:border-blue-500"
                        }
                    `}
                >

                    <input
                        ref={ref}
                        id="linkedin_url"
                        type="url"
                        placeholder="https://linkedin.com/in/your-profile"
                        {...props}
                        className="
                            h-16
                            w-full
                            bg-transparent
                            pr-5
                            text-white
                            outline-none
                            placeholder:text-zinc-500
                            disabled:cursor-not-allowed
                        "
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