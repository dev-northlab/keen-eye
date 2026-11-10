package com.northlab.keeneye;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // The app's own plugin: the system's soft touch feedback for finds and misses.
        registerPlugin(SoftHapticsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
