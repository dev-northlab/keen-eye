package com.northlab.keeneye;

import android.content.Context;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;
import android.view.HapticFeedbackConstants;
import android.view.View;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Soft ticks for a find and a miss (src/services/haptics.ts) at a strength the game sets itself, so a phone that turns
 * its own touch feedback up (Xiaomi does) does not make them strong. Best first: the haptic engine's "tick" primitive at
 * TICK_SCALE (Android 11+, where the motor supports it); else a few milliseconds at a low amplitude (Android 8+ with
 * amplitude control); else the system's lightest touch-feedback tick. A find is one tick, a miss two a moment apart.
 * The game's own "vibration" setting turns them off.
 */
@CapacitorPlugin(name = "SoftHaptics")
public class SoftHapticsPlugin extends Plugin {

    /** Strength of the tick primitive, 0–1. */
    private static final float TICK_SCALE = 0.6f;
    /** The fallback one-shot: its length (ms) and amplitude (1–255). */
    private static final long PULSE_MS = 8;
    private static final int PULSE_AMPLITUDE = 100;
    /** The pause between the two ticks of a miss (ms). */
    private static final int MISS_GAP_MS = 90;

    private Vibrator vibrator() {
        Context context = getContext();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            VibratorManager manager = (VibratorManager) context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE);
            return manager != null ? manager.getDefaultVibrator() : null;
        }
        return (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
    }

    @PluginMethod
    public void tick(PluginCall call) {
        boolean miss = "miss".equals(call.getString("kind", "found"));
        Vibrator vibrator = vibrator();
        if (vibrator != null && vibrator.hasVibrator()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R && vibrator.areAllPrimitivesSupported(VibrationEffect.Composition.PRIMITIVE_TICK)) {
                VibrationEffect.Composition tick = VibrationEffect.startComposition().addPrimitive(VibrationEffect.Composition.PRIMITIVE_TICK, TICK_SCALE);
                if (miss) tick.addPrimitive(VibrationEffect.Composition.PRIMITIVE_TICK, TICK_SCALE, MISS_GAP_MS);
                vibrator.vibrate(tick.compose());
                call.resolve();
                return;
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && vibrator.hasAmplitudeControl()) {
                VibrationEffect pulse = miss
                    ? VibrationEffect.createWaveform(
                        new long[] { 0, PULSE_MS, MISS_GAP_MS, PULSE_MS },
                        new int[] { 0, PULSE_AMPLITUDE, 0, PULSE_AMPLITUDE },
                        -1
                    )
                    : VibrationEffect.createOneShot(PULSE_MS, PULSE_AMPLITUDE);
                vibrator.vibrate(pulse);
                call.resolve();
                return;
            }
        }
        // No way to set the strength: the system's lightest touch-feedback tick.
        int feedback = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1
            ? HapticFeedbackConstants.TEXT_HANDLE_MOVE
            : HapticFeedbackConstants.CLOCK_TICK;
        getActivity()
            .runOnUiThread(() -> {
                View view = getBridge().getWebView();
                view.performHapticFeedback(feedback);
                if (miss) view.postDelayed(() -> view.performHapticFeedback(feedback), MISS_GAP_MS);
                call.resolve();
            });
    }
}
